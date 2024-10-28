const { selectAllLocations } = require("../models/location.model");

exports.getAllLocations = (req, res, next) => {
  selectAllLocations()
    .then((locations) => {
      if (locations.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No events found`,
        });
      }
      locations.forEach((location) => {
        if (Buffer.isBuffer(location.guest_to_capacity)) {
          location.guest_to_capacity = location.guest_to_capacity.toString();
        }
      });

      res.status(200).send({ locations });
    })
    .catch((err) => {
      next(err);
    });
};
