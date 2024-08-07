import ProfileLayout from "../layouts/ProfileLayout";

const Help = () => {

    return (
        <ProfileLayout>
            <div className="flex flex-col justify-start content-center w-full h-full text-4xl font-bold p-12">
                <img
                    className="w-[80vw] md:w-[65vw] lg:w-[45vw]"
                    src="/images/faq.png"
                    alt=""
                />
            </div>
        </ProfileLayout>
    );
};

export default Help;