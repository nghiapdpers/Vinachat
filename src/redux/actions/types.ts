export enum INITIAL {
    START = 'INTITAL_APPL_START',
    END = 'INTITAL_APPL_END',
    FAIL = 'INTITAL_APPL_FAIL',
    CLEAR = 'CLEAR_APP',
}

export enum ERROR {
    NORMAL_RISE = 'ERROR_NORMAL_RISE',
    NORMAL_HIDE = 'ERROR_NORMAL_HIDE',
    NETWORK_RISE = 'ERROR_NETWORK_RISE',
    NETWORK_HIDE = 'ERROR_NETWORK_HIDE',
}

export enum LOGIN {
    START = 'LOGIN_START',
    END = 'LOGIN_START_END',
    FAIL = 'LOGIN_START_FAIL',
}

export enum LOGIN_EXTERNAL {
    START = 'LOGIN_EXTERNAL_START',
    END = 'LOGIN_EXTERNAL_END',
    FAIL = 'LOGIN_EXTERNAL_FAIL',
}

export enum REGISTER {
    START = 'REGISTER_START',
    END = 'REGISTER_END',
    FAIL = 'REGISTER_FAIL',
}

export enum LOGOUT {
    START = 'LOGOUT_START',
    END = 'LOGOUT_END',
    FAIL = 'LOGOUT_FAIL',
}

export enum CLEAR {
    USER = 'CLEAR_USER',
    MESSAGE = "CLEAR_MESSAGE"
}

export enum FRIENDLIST {
    START = 'FRIENDLIST_START',
    END = 'FRIENDLIST_END',
    FAIL = 'FRIENDLIST_FAIL'
}
