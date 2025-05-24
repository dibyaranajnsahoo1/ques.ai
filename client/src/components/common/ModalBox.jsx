const ModalBox = ({ isOpen, children }) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-30  backdrop-blur-sm flex justify-center items-center ">
            <div className="w-[600px]  bg-white rounded-[25px] p-2 ">
                <div className="bg-white p-2 text-black">{children}</div>
            </div>
        </div>
    );
};

export default ModalBox;
