let config = {
    boardWidth: 10,
    boardHeight: 20,
    tileSize:20,
}

let minos = {
    square: [
        [1,1],
        [0,1],
        [0,0],
        [1,0]
    ],
    lpiece: [
        [0,2],
        [0,1],
        [0,0],
        [1,0]
    ],
    ipiece: [
        [0,0],
        [0,1],
        [0,2],
        [0,3]
    ],
    tpiece: [
        [0,0],
        [1,0],
        [2,0],
        [1,1]
    ]
}

let darktheme = {
    bg:     0x25272E,
    red:    0xFF5B46,
    orange: 0xFF7F30,
    yellow: 0xF6FF48,
    green:  0x87FF4C,
    cyan:   0x5EF3E9,
    blue:   0x3B83FF,
    purple: 0xD946FF,
    grey:   0x494D59,

    pink:   0xFF4FB0,
    citrus: 0xFFD553,
    laven:  0x6739FF,
    white:  0xEFFCFF


}

let lighttheme = {
    bg: "light theme is for degenerates",
    grey: 0x2E2E2E // you don't deserve colors if you use light theme
}