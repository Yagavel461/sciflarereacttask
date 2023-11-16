// import { getCookie } from "gfdu";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { getCookie } from "../helpers/utils";

function Routes() {
  return getCookie("IppoStoreAdminToken") ? <PrivateRouter /> : <PublicRouter />;
}

export default Routes;