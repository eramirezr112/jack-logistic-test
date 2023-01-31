import { message, PageHeader, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { addPackage, getPackages } from "../utils";
import PackageForm from "./PackageForm";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../components/Popup";

const headCells = [
  { id: "content", label: "Package Content" },
  { id: "weight", label: "Weight(lb)" },
  { id: "size", label: "Price" },
  { id: "shippingFrom", label: "Origin" },
  { id: "shippingTo", label: "Destination" },
];

const PackageList = (props) => {
  const useStyles = makeStyles((theme) => ({
    pageContent: {
      margin: theme.spacing(3),
      padding: theme.spacing(1),
    },
  }));

  useEffect(() => {
    updateList();
  }, [props.signal]);

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const addNewPackage = (Package, resetForm) => {
    addPackage(Package).then(() => {
      resetForm();
      setOpenPopup(false);
      updateList();
      message.success("Add Successfully");
    });
  };

  const updateList = () => {
    setFetchingData(true);

    getPackages()
      .then((result) => {
        setRecords(result.data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => setFetchingData(false));
  };

  return (
    <>
      <PageHeader
        title="Package List"
        subTitle="(Information)"
        icon={<PeopleOutlineTwoToneIcon fontSize="small" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Button
            text="Add New package"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          {fetchingData ? (
            <></>
          ) : (
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.packageContent}</TableCell>
                  <TableCell>{item.weight}</TableCell>
                  <TableCell>${item.packagePrice}</TableCell>
                  <TableCell>{item.shippingFrom}</TableCell>
                  <TableCell>{item.shippingTo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </TblContainer>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Spin spinning={fetchingData} size="large" />
        </div>
        <TblPagination />
      </Paper>

      <Popup
        title="Package Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <PackageForm
          recordForEdit={recordForEdit}
          addPackage={addNewPackage}
          close={() => {
            setOpenPopup(false);
          }}
        />
      </Popup>
    </>
  );
};

export default PackageList;
