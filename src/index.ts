import { Base } from "./resources/base";
import { RemoveBgFromImage } from "./resources/removeBg";
import { applyMixins } from "./utils";

class Photoroom extends Base {}
interface Photoroom extends RemoveBgFromImage {}

applyMixins(Photoroom, [RemoveBgFromImage]);

export default Photoroom;
