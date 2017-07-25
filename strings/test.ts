import * as util from '../util';
import ssml from '../ssml';

let strings: any = {};

strings.sage =
    new ssml()
    .say("Hello!")
    .pause("330ms")
    .say("How are you doing?")
    .toString();

strings.sage2 =
    new ssml()
    .say("What do you want for dinner?")
    .pause("330ms")
    .say("I would like chinese")
    .toString();

strings.demo = strings.sage2

export default strings;