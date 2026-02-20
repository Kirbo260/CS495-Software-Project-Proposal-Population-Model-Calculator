import Banner from "../components/Banner/Banner";
import HelpGrid from "../components/HelpGrid/HelpGrid";

export default function Help() {
    return(
        <div>
            <Banner title="In what help do you need from us?" showSearch={true} />
            <HelpGrid />
        </div>
    )
}