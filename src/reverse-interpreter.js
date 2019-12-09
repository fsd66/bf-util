const LOOP_THRESHOLD = 10;
const LOOP_INCREMENT = "++++++++++";

const repeatedCommand = (command, n) => {
    let result = "";
    for (let i = 0; i < n; i++) {
        result += command;
    }

    return result;
}

const loop = (commandString, n, commandDictionary) => {
    let result = commandDictionary.shiftRight;

    let loopsRemaining = n;

    if (n >= LOOP_THRESHOLD * 2) {
        let loopCount = Math.floor(loopsRemaining / LOOP_THRESHOLD);
        result += loop(LOOP_INCREMENT, loopCount);
        loopsRemaining -= LOOP_THRESHOLD;
    }

    result += repeatedCommand(commandDictionary.increment, loopsRemaining);
    result += commandDictionary.startLoop;
    result += commandDictionary.shiftLeft;
    result += commandString;
    result += commandDictionary.shiftRight;
    result += commandDictionary.decrement;
    result += commandDictionary.endLoop;

    result += commandDictionary.shiftLeft;
    return result;
}

const incrementCell = (x, commandDictionary) => {
    let result = "";
    if (x >= LOOP_THRESHOLD * 2) {
        let loopedAmount = Math.floor(x / LOOP_THRESHOLD);
        result += loop(LOOP_INCREMENT, loopedAmount, commandDictionary);
        result += repeatedCommand(commandDictionary.increment, x - (loopedAmount * LOOP_THRESHOLD));
    } else {
        result += repeatedCommand(commandDictionary.increment, x);
    }

    return result;
}

const createCharacter = (characterCode, commandDictionary) => {
    let result = incrementCell(characterCode, commandDictionary);
    result += commandDictionary.shiftRight;

    return result;
}

const optimizeProgram = (program, commandDictionary) => {
    const sl = "\\" + commandDictionary.shiftLeft;
    const sr = "\\" + commandDictionary.shiftRight;
    const ic = "\\" + commandDictionary.increment;
    const dc = "\\" + commandDictionary.decrement;

    const reString = sl + sr + "|" + sr + sl + "|" + ic + dc + "|" + dc + ic;
    const regex = new RegExp(reString, "gm");

    return program.replace(regex, "");
}

const generateProgram = (intendedOutput, commandDictionary, insertNewlines = false) => {
    const len = intendedOutput.length;
    let result = "";

    for (let i = 0; i < len; i++) {
        result += createCharacter(intendedOutput.charCodeAt(i), commandDictionary);

        if (insertNewlines) {
            result += "\n";
        }
    }

    result += repeatedCommand(commandDictionary.shiftLeft, len);

    for (let i = 0; i < len; i++) {
        result += commandDictionary.printCell;
        result += commandDictionary.shiftRight;
    }

    result = result.substr(0, result.length - 1);

    return optimizeProgram(result, commandDictionary);
}

module.exports = { generateProgram };
