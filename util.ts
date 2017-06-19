export function formatCard(title: string, description: string): string {
    let res = '';
    if (title) {
      res += `### ${title}\n\n---\n\n`;
    }
    if (description) {
      res += description;
    }
    return res;
}

export function br(n: number = 1): string {
    let res = '';
    for (let i = 0; i < n; ++i) {
        res += ' \n\n';
        if (i < n-1) {
            res += '&nbsp;';
        }
    }
    return res;
}

export function ssml(speech: any): string {
  if (speech && speech._elements instanceof Array) {
    return '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="string">' + speech._elements.join(' ') + '</speak>';
  }
  return '';
};

export const yesRegex: RegExp = /yes|yeah|sure|ok|alright/i;
export const noRegex: RegExp = /no|nope|never|negative/i;