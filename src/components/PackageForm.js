import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../components/controls/Controls";
import { TextField } from "@material-ui/core";
import { Form, useForm } from "../components/useForm";
import * as packageService from "../services/packageService";
import { usePlacesWidget } from "react-google-autocomplete";
import { getCurrentTimeStr } from "../timeUtils";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

const initialFValues = {
  id: 0,
  packageContent: "",
  packageType: "",
  weight: 0,
  packagePrice: "",
  shippingFrom: "",
  shippingTo: "",
  pickUpTime: "",
  deliveryTime: "",
  originLat: 0,
  originLng: 0,
  destinationLat: 0,
  destinationLng: 0,
};

export default function PackageForm(props) {
  const { addPackage, close } = props;
  const [saving, setSaving] = useState(true);
  const [placeFrom, setPlaceFrom] = useState({});
  const [placeTo, setPlaceTo] = useState({});
  const [pickUpTimeRef, setPickUpTimeRef] = useState("");
  const [deliveryTimeRef, setDeliveryTimeRef] = useState("");

  const { ref: shippingFromRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      console.log(place);
      console.log(shippingFromRef.current.value);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());

      setPlaceFrom({
        name: shippingFromRef.current.value,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    },
    inputAutocompleteValue: "country",
    options: {
      types: ["point_of_interest"],
      componentRestrictions: { country: "cr" },
    },
  });

  const { ref: shippingToRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      console.log(place);
      console.log(shippingToRef.current.value);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());

      setPlaceTo({
        name: shippingToRef.current.value,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    },
    inputAutocompleteValue: "country",
    options: {
      types: ["point_of_interest"],
      componentRestrictions: { country: "cr" },
    },
  });

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("packageContent" in fieldValues)
      temp.packageContent = fieldValues.packageContent
        ? ""
        : "This field is required.";
    if ("weight" in fieldValues)
      temp.weight =
        fieldValues.weight.length > 0 ? "" : "Minimum 2 numbers required.";
    if ("packagePrice" in fieldValues)
      temp.packagePrice = fieldValues.packagePrice
        ? ""
        : "This field is required.";

    if ("packageType" in fieldValues)
      temp.packageType =
        fieldValues.packageType.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const newPackage = { ...values };
      newPackage.createdTime = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      newPackage.shippingFrom = placeFrom.name ? placeFrom.name : "";
      newPackage.shippingTo = placeTo.name ? placeTo.name : "";
      newPackage.originLat = placeFrom.lat ? placeFrom.lat : 0;
      newPackage.originLng = placeFrom.lng ? placeFrom.lng : 0;
      newPackage.destinationLat = placeTo.lat ? placeTo.lat : 0;
      newPackage.destinationLng = placeTo.lng ? placeTo.lng : 0;
      newPackage.pickUpTime = pickUpTimeRef
        ? pickUpTimeRef
        : getCurrentTimeStr();
      newPackage.deliveryTime = deliveryTimeRef
        ? deliveryTimeRef
        : getCurrentTimeStr();
      console.log(newPackage);
      addPackage(newPackage, resetForm);
    }
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
              <Controls.Input
                name="packageContent"
                label="Package Content"
                value={values.packageContent}
                onChange={handleInputChange}
                error={errors.packageContent}
              />
              <Controls.Input
                label="Weight(lb)"
                name="weight"
                value={values.weight}
                onChange={handleInputChange}
                error={errors.weight}
              />

              <TextField
                label="Ship from"
                name="shippingFrom"
                fullWidth
                color="secondary"
                variant="outlined"
                placeholder="Ship from"
                inputRef={shippingFromRef}
              />

              <Datetime
                className="datePickerInput"
                inputProps={{
                  name: "pickUpTime",
                  placeholder: "PickUp Time",
                }}
                onChange={(e) => {
                  setPickUpTimeRef(e.format("YYYY-MM-DD HH:mm:ss"));
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Controls.Select
                name="packageType"
                label="Category"
                value={values.packageType}
                onChange={handleInputChange}
                options={packageService.getCategoryCollection()}
                error={errors.packageType}
              />
              <Controls.Input
                name="packagePrice"
                label="Price"
                value={values.packagePrice}
                onChange={handleInputChange}
                error={errors.packagePrice}
              />
              {
                <TextField
                  label="Ship to"
                  name="shippingTo"
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  placeholder="Ship to"
                  inputRef={shippingToRef}
                />
              }

              <Datetime
                className="datePickerInput"
                inputProps={{
                  name: "deliveryTime",
                  placeholder: "Delivery Time",
                }}
                onChange={(e) => {
                  setDeliveryTimeRef(e.format("YYYY-MM-DD HH:mm:ss"));
                }}
              />
              <div>
                <Controls.Button
                  type="submit"
                  text="ADD PACKAGE"
                  style={{ fontWeight: "bold" }}
                />
                <Controls.Button
                  text="Reset"
                  color="default"
                  onClick={resetForm}
                />
              </div>
            </Grid>
          </Grid>
        </Form>
      </div>
    </>
  );
}
