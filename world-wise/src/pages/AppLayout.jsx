import Sidebar from "../components/SideBar";
import Map from "../components/Map";
import style from './AppLayout.module.css'

const AppLayout = () => {
  return (
    <div className={style.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
