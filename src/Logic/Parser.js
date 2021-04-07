const parseString = (str) => {
    var input_list = str.split(" ");
    var input_str = input_list.join("")

    var handled_not = remove_not(input_str)
    var handled_and = remove_and(handled_not)
    var handled_or = remove_or(handled_and)
    var handled_imply = remove_imply(handled_or)
    var handled_iff = remove_iff(handled_imply)

    return handled_iff
}

const remove_not = (str) => {
    var ans = []
    for (var i = 0; i < str.length; i++) {
        if (i > 1 && str.charAt(i) === "t" && str.charAt(i - 1) === "o" && str.charAt(i - 2) === "n") {
            ans = ans.slice(0, ans.length - 2)
            ans.push("~")
        } else {
            ans.push(str.charAt(i))
        }
    }

    return ans.join("")
}

const remove_and = (str) => {
    var ans = []
    for (var i = 0; i < str.length; i++) {
        if (i > 1 && str.charAt(i) === "d" && str.charAt(i - 1) === "n" && str.charAt(i - 2) === "a") {
            ans = ans.slice(0, ans.length - 2)
            ans.push("&")
        } else if (i > 0 && str.charAt(i) === "\\" && str.charAt(i - 1) === "/") {
            ans = ans.slice(0, ans.length - 1)
            ans.push("&")
        } else {
            ans.push(str.charAt(i))
        }
    }

    return ans.join("")
}

const remove_or = (str) => {
    var ans = []
    for (var i = 0; i < str.length; i++) {
        if (i > 1 && str.charAt(i) === "r" && str.charAt(i - 1) === "o") {
            ans = ans.slice(0, ans.length - 1)
            ans.push("|")
        } else if (i > 0 && str.charAt(i) === "/" && str.charAt(i - 1) === "\\") {
            ans = ans.slice(0, ans.length - 1)
            ans.push("|")
        } else {
            ans.push(str.charAt(i))
        }
    }

    return ans.join("")
}

const remove_imply = (str) => {
    var ans = []
    for (var i = 0; i < str.length; i++) {
        if (i > 4 && str.charAt(i) === "y" && str.charAt(i - 1) === "l" && str.charAt(i - 2) === "p"
                && str.charAt(i - 3) === "m" && str.charAt(i - 4) === "i") {
            ans = ans.slice(0, ans.length - 4)
            ans.push(">")
        } else if (i > 1 && str.charAt(i) === ">" && str.charAt(i - 1) === "-" && str.charAt(i - 2) !== "<") {
            ans = ans.slice(0, ans.length - 1)
            ans.push(">")
        } else {
            ans.push(str.charAt(i))
        }
    }

    return ans.join("")
}

const remove_iff = (str) => {
    var ans = []    
    for (var i = 0; i < str.length; i++) {
        var left
        var right
        if (i > 1 && str.charAt(i) === "f" && str.charAt(i - 1) === "f" && str.charAt(i - 2) === "i") {
            ans = ans.slice(0, ans.length - 2)
            left = remove_iff(ans.join(""))
            right = remove_iff(str.split("").slice(i + 1, str.length).join(""))
            ans = ("((" + left + ")>(" + right + "))&((" + right + ")>(" + left + "))").split("")
            break
        } else if (i > 1 && str.charAt(i) === ">" && str.charAt(i - 1) === "-" && str.charAt(i - 2) === "<") {
            ans = ans.slice(0, ans.length - 2)
            left = remove_iff(ans.join(""))
            right = remove_iff(str.split("").slice(i + 1, str.length).join(""))
            ans = ("((" + left + ")>(" + right + "))&((" + right + ")>(" + left + "))").split("")
            break
        } else {
            ans.push(str.charAt(i))
        }
    }

    return ans.join("")
}

export default parseString