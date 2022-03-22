import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const MONTH=useMemo(()=>
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],[]
  )
  const [userStats, setuserStats] = useState([])
  useEffect(() => {
    const getStats = async ()=>{
    try {
      const res = await axios.get("/user/stats",{
        headers: {
          token:
          "Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      res.data.map(item=> setuserStats(prev=>[...prev,{name:MONTH[item._id-1],"New User":item.total}]))
    } catch (error) {
      console.log(error)
    }
  }
  getStats()
    
  }, [])
  console.log(userStats)
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
