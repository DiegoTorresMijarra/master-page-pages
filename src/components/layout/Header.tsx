import React, {useState} from 'react';
import {cn} from '@/lib/utils';
import Link from "next/link";

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="bg-artisan-light border-b border-artisan-muted">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/images/logo.png" alt="Artisan Web Corner" className="h-10 w-auto"/>
                        <span className="text-artisan-dark font-serif text-xl font-bold">Artisan Web Corner</span>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <NavLink to="/">Inicio</NavLink>
                        <NavLink to="/about">Quienes Somos</NavLink>
                        <NavLink to="/products">Productos</NavLink>
                        <NavLink to="/contact">Contacto</NavLink>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-artisan-dark p-2"
                        onClick={toggleMobileMenu}
                        aria-label="Menú"
                    >
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        "md:hidden absolute z-50 left-0 right-0 bg-artisan-light border-b border-artisan-muted shadow-lg transition-all duration-300 ease-in-out",
                        mobileMenuOpen ? "max-h-60 py-4" : "max-h-0 py-0 overflow-hidden"
                    )}
                >
                    <nav className="flex flex-col space-y-4 px-4">
                        <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>Inicio</MobileNavLink>
                        <MobileNavLink to="/about" onClick={() => setMobileMenuOpen(false)}>Quienes
                            Somos</MobileNavLink>
                        <MobileNavLink to="/products" onClick={() => setMobileMenuOpen(false)}>Productos</MobileNavLink>
                        <MobileNavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>Contacto</MobileNavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
};

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({to, children}) => {
    return (
        <Link
            href={to}
            className="text-artisan-dark hover:text-artisan-primary font-medium transition-colors"
        >
            {children}
        </Link>
    );
};

const MobileNavLink: React.FC<NavLinkProps> = ({to, children, onClick}) => {
    return (
        <Link
            href={to}
            className="text-artisan-dark hover:text-artisan-primary py-2 font-medium transition-colors"
            onClick={onClick}
        >
            {children}
        </Link>
    );
};

export default Header;
