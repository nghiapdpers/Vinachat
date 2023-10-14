import { AnyAction } from 'redux';
import { GROUPCHAT } from '../actions/types';

const initialState = {
    loading: false,
    data: [],
    status: 'notLoading'
};

export default function listGroupChatReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case GROUPCHAT.START:
            return {
                ...state,
                loading: true,
                status: 'loading'
            }
        case GROUPCHAT.END:
            return {
                ...state,
                loading: false,
                data: action.payload?.data,
                status: 'done'
            };
        case GROUPCHAT.FAIL:
            return {
                ...state,
                loading: false,
                status: 'fail'
            }
        case GROUPCHAT.UPDATE_LATEST_MESSAGE:
            // Dữ liệu nhận
            const updatedDataArray = action.payload;

            // Tạo một bản sao của data để cập nhật
            const updatedData: any[] = [...state.data];

            // Tạo mảng mới để lưu các mục có `latest_message_text` đã thay đổi
            const updatedTextData: any[] = []

            // Cập nhật trường "latest_message_text" cho từng mục trong mảng
            updatedDataArray?.forEach((updatedItem: any) => {
                const index = updatedData.findIndex((item: any) => item?.ref === updatedItem.ref);
                // console.log('vị trí index:>>', index);


                // Nếu tìm thấy mục với cùng ref và khác latest_message_text thì cập nhật "latest_message_text"
                if (index !== -1 && updatedData[index].latest_message_text !== updatedItem.latest_message_text && updatedItem.latest_message_text) {
                    // Cập nhập nội dung tin nhắn
                    updatedData[index].latest_message_text = updatedItem.latest_message_text;
                    // Cập nhập tên người gửi tin nhắn
                    updatedData[index].latest_message_from_name = updatedItem.latest_message_from_name;
                    updatedTextData.push(updatedData[index]); // Thêm mục này vào mảng đã thay đổi
                } else if (index !== -1 && updatedData[index].latest_message_type !== updatedItem.latest_message_type) {
                    // Cập nhật type message
                    updatedData[index].latest_message_type = updatedItem.latest_message_type;
                    // Cập nhập tên người gửi tin nhắn
                    updatedData[index].latest_message_from_name = updatedItem.latest_message_from_name;
                    updatedTextData.push(updatedData[index]); // Thêm mục này vào mảng đã thay đổi
                }

            });

            // console.log('mục có latestMessage thay đổi:>>', updatedTextData);

            // Lọc ra các mục chưa thay đổi `latest_message_text`
            const unchangedData = updatedData.filter((item: any) => !updatedTextData.some((updatedItem: any) => updatedItem.ref === item.ref));

            // console.log('mục không thay đổi:>>', unchangedData);

            // Sắp xếp mảng mới dựa trên việc các mục có `latest_message_text` thay đổi lên đầu
            const newData = [...updatedTextData, ...unchangedData];

            // console.log('New Data:>>', newData);
            return {
                ...state,
                data: newData,
            };
        case GROUPCHAT.CLEAR:
            return initialState;
        default:
            return state;
    }
}