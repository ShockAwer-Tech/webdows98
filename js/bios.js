var bios = document.querySelector(".biosText")
var scandisk = document.querySelector("#scandisk")

function write(content) {
    bios.innerHTML += content + "<br>"
}

var lines = `WebBios BIOS v1.00
Copyright (C) 2019, theLMGN Technologies, Inc.

GenuineIntel-Pentium(r) II Processor 266 MHz
Memory Testing  : 524288K OK

WebBIOS Plug and Play BIOS Extension  v1.0A
Copyright (C) 2019, theLMGN Technologies, Inc.`

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
}
go()