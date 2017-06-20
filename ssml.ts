export type Strength = 'none' | 'x-weak' | 'weak' | 'medium' | 'strong' | 'x-strong';
export type InterpretAs = 'characters' | 'spell-out' | 'cardinal' | 'number' | 'ordinal' | 'digits' | 'fraction' | 'unit' | 'date' | 'time' | 'telephone' | 'address' | 'interjection' | 'expletive';
export type Alphabet = 'ipa' | 'sapi' | 'ups';
export type Pitch = 'x-low' | 'low' | 'medium' | 'high' | 'x-high' | 'default';
export type Rate = 'x-slow' | 'slow' | 'medium' | 'fast' | 'x-fast' | 'default';
export type Volume = 'silent' | 'x-soft' | 'soft' | 'medium' | 'loud' | 'x-loud' | 'default';
export type ProsodyOptions = { pitch?: Pitch | string, contour?: string, range?: string, rate?: Rate | string, duration?: string, volume?: Volume | string };

export default class SsmlBuilder {
    private elements: Array<string>;

    constructor() {
      this.elements = [];
    }

    toString(): string {
      return this.ssml();
    }

    ssml(lang: string = "en-US"): string {
      return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang}">${this.elements.join(' ')}</speak>`;
    }

    say(text: string): SsmlBuilder {
      this.elements.push(`${text}`);
      return this;
    }

    p(text: string): SsmlBuilder {
      this.elements.push(`<p>${text}</p>`);
      return this;
    }

    s(text: string): SsmlBuilder {
      this.elements.push(`<s>${text}</s>`);
      return this;
    }

    pause(duration: string): SsmlBuilder {
      this.elements.push(`<break time="${duration}" />`);
      return this;
    }

    pauseStrength(strength: Strength): SsmlBuilder {
      this.elements.push(`<break strength="${strength}" />`);
      return this;
    }

    audio(src: string, text: string = ''): SsmlBuilder {
      // Requirements for the audio file:
      // * mp3 format (MPEG2)
      // * downsampled to 48 kbps, 16000 Hz
      // * hosted on trusted https:// endpoint
      // * total duration of text-to-speech + audio clip is no more than 90 seconds
      this.elements.push(`<audio src="${src}">${text}</audio>`);
      return this;
    }

    sayAs(text: string, interpretAs: InterpretAs, format?: string): SsmlBuilder {
      if (format) {
        this.elements.push(`<say-as interpret-as="${interpretAs}">${text}</say-as>`);
      }
      else {
        this.elements.push(`<say-as interpret-as="${interpretAs}" format="${format}">${text}</say-as>`);
      }
      return this;
    }

    phoneme(alphabet: Alphabet, ph: string, text: string): SsmlBuilder {
      this.elements.push(`<phoneme alphabet="${alphabet}" ph="${ph}">${text}</phoneme>`);
      return this;
    }

    sub(from: string, to: string): SsmlBuilder {
      this.elements.push(`<sub alias="${to}">${from}</sub>`);
      return this;
    }
    
    prosody(text: string, options: ProsodyOptions): SsmlBuilder {
      let elem = '<prosody';
      if (options.contour) {
        elem += ` contour="${options.contour}"`;
      }
      if (options.duration) {
        elem += ` duration="${options.duration}"`;
      }
      if (options.pitch) {
        elem += ` pitch="${options.pitch}"`;
      }
      if (options.rate) {
        elem += ` rate="${options.rate}"`;
      }
      if (options.range) {
        elem += ` range="${options.range}"`;
      }
      if (options.volume) {
        elem += ` volume="${options.volume}"`;
      }
      elem += `>${text}</prosody>`;
      this.elements.push(elem);
      return this;
    }
}