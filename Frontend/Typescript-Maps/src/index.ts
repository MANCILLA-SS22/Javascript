import { Company } from "./Company";
import { CustomMap } from "./CustomMap";
import { User } from "./User";

const customMap = new CustomMap('map');
const company = new Company();
const user = new User();

customMap.addMarker(user);
customMap.addMarker(company);