/* 2015 Tiny brainf*ck JS parser by Elwin Arens */
function Brainfuck(code, input) {
    var bytes=[];
    var output='';
    var op=0,cp=0,ip=0;
    var opens=[];
    var end=code.length-1;
    var ch;
    while(cp!=end) {
        ch = code[cp];
        cp+=1;
        if (typeof bytes[op] === 'undefined') bytes[op]=0;
        switch(ch) {
            case '+':
                bytes[op]+=1;
                break;
            case '-':
                bytes[op]-=1;
                break;
            case '<':
                op-=1;
                break;
            case '>':
                op+=1;
                break;
            case '[':
                opens.push(cp-1);
                if(bytes[op]===0) cp = code.substr(cp-1, end).indexOf(']')+1;
                break;
            case ']':
                last_open = opens.pop();
                if(bytes[op]!==0) cp = last_open;
                break;
            case '.':
                output += String.fromCharCode(bytes[op]);
                break;
            case ',':
                bytes[op] = input.charCodeAt(ip++);
                break;
        }
    }
    return output;
}
