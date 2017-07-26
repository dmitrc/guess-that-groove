import * as util from '../util';
import ssml from '../ssml';

let miscResources = {
    repeat: {
        title: '',
        description: 'Sure, here it is again:',
        speech: new ssml().say('Sure, here it is again').toString()
    },
    cancel: {
        title: 'Exiting...',
        description: 'Thanks for playing Guess that Groove!',
        speech: new ssml().say('Thanks for playing Guess that Groove!').toString()
    },
    confirm: {
        title: 'Are you sure?',
        description: 'This will cancel your current progress and not record your score.',
        speech: new ssml().say('This will cancel your current progress. Are you sure?').toString()
    }
};

export default miscResources;