import { AiOutlineCrown } from 'react-icons/ai';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { RiShieldStarLine } from 'react-icons/ri';

const DetailsCard = ({ color, title, icon, subtitle }) => (
    <div className="flex flex-row justify-start items-center black-glass p-3 m-2 cursor-pointer hover:shadow-xl sm:w-[35vw]">
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className="ml-5 flex flex-col flex-1">
            <h1 className="mt-2 text-white text-lg">{title}</h1>
            <p className="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
        </div>
    </div>
)

const Details = () => {
    return (
        <div className="flex flex-col w-full justify-start items-center -mt-20">
            <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 px-4">
                <div className="flex-1 flex flex-col justify-start sm:items-start items-center">
                    <h1 className="text-white text-2xl sm:text-5xl py-2 text-gradient"> 
                        You've never used an Exchange
                        <br />
                        this sexy and simple
                    </h1>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-start items-center w-[300px] sm:w-full">
                <DetailsCard 
                    color="bg-[#2952E3]"
                    title="Sexy Guaranteed"
                    icon={<AiOutlineCrown fontSize={21} className="text-white" />}
                    subtitle="Sexy is our number one priority. We want our exchange to make our users feel good"
                />

                <DetailsCard 
                    color="bg-[#6BA925]"
                    title="Zero Downtime"
                    icon={<AiOutlineThunderbolt fontSize={21} className="text-white" />}
                    subtitle="All Transactions are as fast as the blockchain. Just like lightning!"
                />

                <DetailsCard 
                    color="bg-[#C32929]"
                    title="Secure Transactions"
                    icon={<RiShieldStarLine fontSize={21} className="text-white" />}
                    subtitle="In combination with Metamask, transactions made through us keep you protected"
                />
            </div>
        </div>
    );
}

export default Details;