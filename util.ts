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

export function trim(s: string): string {
    return s
        .replace(/\./g, "")
        .replace(/\?/g, "")
        .replace(/\!/g, "")
        .replace(/'/g, "");
}

export function formatCard(title: string, description: string): string {
    let res = '';
    if (title) {
      res += `### ${title}${br()}---${br()}`;
    }
    if (description) {
      res += description;
    }
    return res;
}