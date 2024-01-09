import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

// import { Header } from "../components";

interface LayoutProps {
  title?: string;
  desc?: string;
}

const Layout = ({ desc, title }: LayoutProps) => {
  return (
    <div className="">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>
      {/* <Header /> */}
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

Layout.defaultProps = {
  title: "Todo app",
  desc: "For test",
};

export default Layout;
