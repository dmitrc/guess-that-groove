import * as util from '../util';
import ssml from '../ssml';

let strings: any = {};

strings.demo =
    new ssml()
    .say("Hello!")
    .pause("330ms")
    .say("How are you doing?")
    .toString();

export default strings;