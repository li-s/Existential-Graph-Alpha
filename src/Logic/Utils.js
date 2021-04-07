// Find indexes of matching parenthesis
const find_parenthesis = (str) => {
    var toret = {}
    var pstack = []
    str = str.toString().split("")

    for (const [index, element] of str.entries()) {
        if (element === "(") {
            pstack.push(index)
        } else if (element === ")") {
            if (pstack.length === 0) {
                console.log("No matching closing parenthesis")
            }
            toret[pstack.pop()] = index
        }
    }

    if (pstack.length > 0) {
        console.log("No matching opening parenthesis")
    }

    return toret
}

const enclosed_parens = (dict) => {
    var ans = []
    var dup_ans = []
    for (const key in dict) {
        for (var i = parseInt(key); i < dict[key] + 1; i++) {
            dup_ans.push(i)
        }
    }

    dup_ans.sort((a, b) => a - b)
    for (var j = 0; j < dup_ans.length; j++) {
        if (!ans.includes(dup_ans[j])) {
            ans.push(dup_ans[j])
        }
    }

    return ans
}

const index_match = (char, str) => {
    var index = []
    var excluded = enclosed_parens(find_parenthesis(str))
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) === char && !excluded.includes(i)) {
            index.push(i)
        }
    }

    return index
}

export { index_match, find_parenthesis }