var bios = document.querySelector(".biosText")
var scandisk = document.querySelector("#scandisk")
var boot = document.querySelector("#boot")

function write(content) {
    bios.innerHTML += content + "<br>"
}

var lines = `<img src="img/award.svg" height="32px" width="20px" id="award"/>
<img src="img/award.svg" height="0px" width="25px"/>Award Modular BIOS v5PC, An Energy Star Ally
<img src="img/award.svg" height="0px" width="25px"/>Copyright (C) 1984-98, Award Software Inc.

GenuineIntel-Pentium(r) II Processor 266 MHz
Memory Testing  : 65536 OK

Award Plug and Play BIOS Extension  v1.0A
Copyright (C) 1998, Award Softwarer, Inc.`

function updateScandisk(pcnt) {
    var noPos = "░"
    var yesChar = "█"
    var bar = ""
    pcnt = pcnt / 100
    var len = 65
    if (pcnt < 10) {
       len = 66
    } else if (pcnt > 99) {
       len = 64
    }
    bar = yesChar.repeat(Math.ceil(pcnt * len)) + noPos.repeat(len - Math.ceil(pcnt * len))

    scandisk.querySelector(".alignbottom").innerHTML = `<hr>
    ${Math.floor(pcnt * 100)}% complete <b class="yellow">${bar}</b>`
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

    scandisk.style.display = "none"
    boot.style.display = "block"
}
go()