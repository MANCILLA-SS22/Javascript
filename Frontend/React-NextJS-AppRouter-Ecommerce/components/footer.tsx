import { APP_NAME } from "@/lib/constants";

function Footer() {
    return (
        <footer className="border-t">
            <div className="p-5 flex-center">
                {new Date().getFullYear()} {APP_NAME}. All Right Reserverd
            </div>
        </footer>
    );
}

export default Footer;