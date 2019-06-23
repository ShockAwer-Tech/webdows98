var bios = document.querySelector(".biosText")
var scandisk = document.querySelector("#scandisk")

function write(content) {
    bios.innerHTML += content + "<br>"
}

var lines = `WebBios BIOS v1.00
Copyright (C) 2019, theLMGN Technologies, Inc.

GenuineIntel-Pentium(r) II Processor 266 MHz
Memory Testing  : 65536 OK

WebBIOS Plug and Play BIOS Extension  v1.0A
Copyright (C) 2019, theLMGN Technologies, Inc.`

function updateScandisk(pcnt) {
    var noPos = "░"
    var yesChar = "█"
    var bar = ""
    pcnt = pcnt / 100
    if (pcnt < 10) {
        bar = yesChar.repeat(Math.ceil(pcnt * 68)) + noPos.repeat(68 - Math.floor(pcnt * 68))
    } else {
        bar = yesChar.repeat(Math.ceil(pcnt * 67)) + noPos.repeat(67 - Math.floor(pcnt * 67))
    }

    scandisk.querySelector(".alignbottom").innerHTML = `<hr>
    ${Math.floor(pcnt * 100)}% complete ${bar}`
}

async function go() {
    bios.innerText = ""
    for (var line of lines.split("\n")) {
        write(line)
        await sleep(15)
    }
    beep(100, 880, 1, "square")
    write(`
    <div class="alignBottom">
        Press <b>DEL</b> to enter SETUP.<br>
        06/23/1998-a8hw
    </div>
    `)
    await sleep(1000)
    bios.style.display = "none"
    scandisk.style.display = "block"

    for (x = 0; x < 61; x++) {
        updateScandisk(x)
        await sleep((Math.random() * 60) + 30)
    }
    await sleep(2500)
    for (x = 60; x < 101; x++) {
        updateScandisk(x)
        await sleep((Math.random() * 60) + 30)
    }
    await sleep(1000)
}
go()