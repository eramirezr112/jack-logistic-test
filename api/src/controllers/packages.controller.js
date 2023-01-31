import { getConnection, queries } from "../database";

export const getPackages = async (req, res) => {
  try {
    const pool = await getConnection();

    pool.query(queries.getAllPackages, function (err, data, fields) {
      if (err) return next(new AppError(err));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getPackageById = async (req, res) => {
  try {
    const { codPackage } = req.params;
    const pool = await getConnection();

    pool.query(
      queries.getPackageById,
      [codPackage],
      function (err, data, fields) {
        if (err) return next(new AppError(err));
        res.status(200).json({
          status: "success",
          length: data?.length,
          data: data,
        });
      }
    );
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const addPackage = async (req, res) => {
  try {
    const pool = await getConnection();
    pool.query(
      `INSERT INTO packages (packageContent,packageType,weight,packagePrice,shippingFrom,shippingTo,createdTime,pickUpTime,deliveryTime,originLat,originLng,destinationLat,destinationLng) VALUES ('${req.body.packageContent}', '${req.body.packageType}', ${req.body.weight}, ${req.body.packagePrice}, '${req.body.shippingFrom}', '${req.body.shippingTo}', '${req.body.createdTime}', '${req.body.pickUpTime}', '${req.body.deliveryTime}', ${req.body.originLat}, ${req.body.originLng}, ${req.body.destinationLat}, ${req.body.destinationLng})`
    );
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
