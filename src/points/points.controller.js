const service = require("./points.service");

async function addTransaction(req, res, next) {
  const  data  = req.body;
  const newRecord = await service.create(data);

  res.status(201).json(newRecord);
}

//this funciton will edit the spentPoints updating existing payer values and creating non-exiting payer values
function editPointObject(payer, pointValue, pointObject) {
  if (pointObject[payer]) {
    pointObject[payer] = pointObject[payer] + pointValue;
  } else {
    pointObject[payer] = pointValue;
  }

  return pointObject;
}

function pointArrayFromObject(pointObject) {
  const result = [];
  for (const [key, value] of Object.entries(pointObject)) {
    result.push({ payer: key, points: value });
  }
  return result;
}

async function spendPoints(req, res, next) {
  //unpack points to spend from data
  let pointsToSpend = req.body.points;
  let spentPoints = {};
  while (pointsToSpend > 0) {
    const oldestPoints = await service.read();
    const { payer, points, timestamp } = oldestPoints;
    const remainingSpendable = pointsToSpend - points;
    pointsToSpend = remainingSpendable;
    if (remainingSpendable > 0 || remainingSpendable === 0) {
      //if there are remaining points to spend, push the spent points to the spent points array
      //then destroy the record where the points where entirely spent
      spentPoints = editPointObject(payer, points * -1, spentPoints);
      await service.update(timestamp, 0);
    } else {
      // in this case the points are negative, meaning there where more available points than points to spend
      // set points to spend to 0 and update the record where there were left over points to spend
      const remainingAvailable = Math.abs(pointsToSpend);
      spentPoints = editPointObject(
        payer,
        (points - remainingAvailable) * -1,
        spentPoints
      );
      await service.update(timestamp, remainingAvailable);
      pointsToSpend = 0;
    }
  }

  const result = pointArrayFromObject(spentPoints);

  res.status(200).json(result);
}

async function pointBalance(req, res, next) {
  const pointData = await service.get();

  const pointBalance = {};

  pointData.forEach(({ payer, points }) => {
    editPointObject(payer, points, pointBalance);
  });

  const result = pointArrayFromObject(pointBalance)

  res.status(200).json(result)
}

module.exports = {
  addTransaction,
  spendPoints,
  pointBalance,
};
