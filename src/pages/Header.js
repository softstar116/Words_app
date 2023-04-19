import Link from 'next/link';

function Header() {
    return (
        <div className="topnav">
            <Link className="active" href="/home">Home</Link>
            <Link href="/words">Collections</Link>
            {/* <Link href="/collections">manage_collections</Link> */}
        </div>
    );
}

export default Header;