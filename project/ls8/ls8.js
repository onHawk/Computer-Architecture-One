const RAM = require('./ram');
const CPU = require('./cpu');

let fs = require('fs');

/**
 * Load an LS8 program into memory
 *
 * TODO: load this from a file on disk instead of having it hardcoded
 */
function loadMemory() {
  // Hardcoded program to print the number 8 on the console

  // const contents = fs.readFileSync('./mult.ls8', 'utf8');
  //   console.log(contents);

  // const program = contents.trim().split(/[\r\n]+/g);

  //   console.log(program);

  // |||||||||||| mult.ls8 ||||||||||||||
  const program = [
    '10011001', //# LDI R0, 1
    '00000000',
    '00000001',
    '10011001', //# LDI R1, 2
    '00000001',
    '00000010',
    '01001101', //# PUSH R0
    '00000000',
    '01001100', //# POP R1
    '00000001',
    '01000011', //# PRN R1
    '00000001',

    '10011001', //# LDI R0, 2
    '00000000',
    '00000010',
    '01001101', //# PUSH R0
    '00000000',
    '10011001', //# LDI R0, 3
    '00000000',
    '00000011',
    '01001100', //# POP R0
    '00000000',
    '01000011', //# PRN R0
    '00000000',
    '00000001' //# HLT
  ];
  // ||||||||||| print8.ls8 |||||||||||||
  // ''10011001'', // LDI R0,8  Store 8 into R0
  // '00000000',
  // '00001000',
  // '01000011', // PRN R0    Print the value in R0
  // '00000000',
  // '00000001' // HLT       Halt and quit

  // Load the program into the CPU's memory a byte at a time
  for (let i = 0; i < program.length; i++) {
    cpu.poke(i, parseInt(program[i], 2));
  }
}

/**
 * Main
 */

let ram = new RAM(256);
let cpu = new CPU(ram);

// TODO: get name of ls8 file to load from command line

loadMemory(cpu);

cpu.startClock();
