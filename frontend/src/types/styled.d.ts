import "styled-components";
import type {TypeTheme} from "../themes/typeTheme.ts";

declare module "styled-components" {
    export interface DefaultTheme extends TypeTheme {}
}
