import * as util from '../util';
import ssml from '../ssml';

let strings: any = {};

strings.intro = new ssml();
strings.intro.say("Hello!");

export default strings;