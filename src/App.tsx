import DeskNotionalGrid from "./DeskNotionalGrid";
import TraderNotionalGrid from "./TraderNotionalGrid";
import {useState} from "react";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import NotionalBreachesGrid from "./NotionalBreachesGrid";

const App = () => {

    const [tabValue, setTabValue] = useState('1');

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    }

  return (
      <div style={{ height: 500, width: '100%' }}>
          <Box>
              <TabContext value={tabValue}>
                  <Box>
                      <TabList centered onChange={handleChange} textColor='primary' indicatorColor='primary'>
                          <Tab sx={{backgroundColor:'lightgray', textTransform: 'capitalize', fontWeight: 'bold', border: '1px solid gray', borderTopRightRadius: '8px', borderTopLeftRadius: '8px'}} label='Desk Notionals' value='1'/>
                          <Tab sx={{backgroundColor:'lightgray', textTransform: 'capitalize', fontWeight: 'bold', border: '1px solid gray', borderTopRightRadius: '8px', borderTopLeftRadius: '8px'}} label='Trader Notionals' value='2'/>
                          <Tab sx={{backgroundColor:'lightgray', textTransform: 'capitalize', fontWeight: 'bold', border: '1px solid gray', borderTopRightRadius: '8px', borderTopLeftRadius: '8px'}} label='Notional Breaches' value='3'/>
                      </TabList>
                  </Box>
                  <TabPanel value='1'>
                      <div>
                          <DeskNotionalGrid/>
                      </div>
                  </TabPanel>
                  <TabPanel value='2'>
                      <div>
                          <TraderNotionalGrid/>
                      </div>
                  </TabPanel>
                  <TabPanel value='3'>
                      <div>
                          <NotionalBreachesGrid/>
                      </div>
                  </TabPanel>
              </TabContext>
          </Box>
      </div>
  )
}

export default App
