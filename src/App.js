import { Layout } from "antd";
import React, { useState } from "react";
import logo from "./image/jack-logo.png";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import MyCart from "./components/MyCart";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import Main from "./components/Main";

const { Header, Content, Footer } = Layout;
const theme = createTheme({
  palette: {
    primary: {
      main: "#959bf1",
      light: "#3c44b126",
    },
    secondary: {
      main: "#a7abee",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "60vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/drone0.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  appMain: {
    width: "100%",
  },
}));

function App() {
  const classes = useStyles();
  const [showPackageList, setShowPackageList] = useState(true);
  const [signal, setSignal] = useState(true);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <div className="header">
          <img height={60} src={logo} alt="logo" style={{ marginBottom: 5 }} />
          <div>
            <MyCart
              setShowPackageList={setShowPackageList}
              setSignal={() => {
                setSignal(!signal);
              }}
            />
          </div>
        </div>
      </Header>

      <ThemeProvider theme={theme}>
        <Content
          style={{
            padding: "40px 50px 50px 50px",
            maxHeight: "calc(100% - 64px)",
            overflowY: "auto",
          }}
        >
          <div className={classes.appMain}>
            <Main showPackageList={showPackageList} signal={signal} />
          </div>
        </Content>
        <CssBaseline />
      </ThemeProvider>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#001529",
          color: "white",
        }}
      >
        Jack Logistics Company ©2023 Created by Esteban Ramírez R.
      </Footer>
    </Layout>
  );
}

export default App;
