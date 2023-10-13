import { GROUPCHAT } from "./types";

// LOGIN ACTION
export const actionListGroupChatStart = () => ({
    type: GROUPCHAT.START,
})

export const actionListGroupChatEnd = (data: any) => ({
    type: GROUPCHAT.END,
    payload: data,
});

export const actionListGroupChatFail = (data: any) => ({
    type: GROUPCHAT.FAIL,
    payload: data,
});

export const actionUpdateLatestMessage = (updateData: any[]) => ({
    type: GROUPCHAT.UPDATE_LATEST_MESSAGE,
    payload: updateData,
});

export const actionClearGroupChat = ({
    type: GROUPCHAT.CLEAR,
});

