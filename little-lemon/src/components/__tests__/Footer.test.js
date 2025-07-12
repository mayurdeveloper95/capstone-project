import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
    describe('Rendering', () => {
        test('renders footer with proper role', () => {
            render(<Footer />);
            
            expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        });

        test('renders restaurant name section', () => {
            render(<Footer />);
            
            expect(screen.getByText('Little Lemon')).toBeInTheDocument();
            expect(screen.getByText(/A family-owned Mediterranean restaurant/)).toBeInTheDocument();
        });

        test('renders contact section', () => {
            render(<Footer />);
            
            expect(screen.getByText('Contact')).toBeInTheDocument();
            expect(screen.getByText('123 Mediterranean Way')).toBeInTheDocument();
            expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
            expect(screen.getByText('info@littlelemon.com')).toBeInTheDocument();
        });

        test('renders hours section', () => {
            render(<Footer />);
            
            expect(screen.getByText('Hours')).toBeInTheDocument();
            expect(screen.getByText('Monday - Sunday')).toBeInTheDocument();
            expect(screen.getByText('11:00 AM - 10:00 PM')).toBeInTheDocument();
        });

        test('renders copyright notice', () => {
            render(<Footer />);
            
            const currentYear = new Date().getFullYear();
            expect(screen.getByText(`© ${currentYear} Little Lemon. All rights reserved.`)).toBeInTheDocument();
        });
    });

    describe('Contact Information', () => {
        test('displays correct address', () => {
            render(<Footer />);
            
            expect(screen.getByText('123 Mediterranean Way')).toBeInTheDocument();
        });

        test('displays correct phone number', () => {
            render(<Footer />);
            
            const phoneLink = screen.getByRole('link', { name: /\(555\) 123-4567/i });
            expect(phoneLink).toBeInTheDocument();
            expect(phoneLink).toHaveAttribute('href', 'tel:+15551234567');
        });

        test('displays correct email address', () => {
            render(<Footer />);
            
            const emailLink = screen.getByRole('link', { name: /info@littlelemon\.com/i });
            expect(emailLink).toBeInTheDocument();
            expect(emailLink).toHaveAttribute('href', 'mailto:info@littlelemon.com');
        });

        test('displays correct business hours', () => {
            render(<Footer />);
            
            expect(screen.getByText('Monday - Sunday')).toBeInTheDocument();
            expect(screen.getByText('11:00 AM - 10:00 PM')).toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        test('has proper semantic structure', () => {
            render(<Footer />);
            
            expect(screen.getByRole('contentinfo')).toBeInTheDocument();
            expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
            expect(screen.getByRole('contentinfo')).toBeInTheDocument();
        });

        test('contact links have proper focus styles', () => {
            render(<Footer />);
            
            const phoneLink = screen.getByRole('link', { name: /\(555\) 123-4567/i });
            const emailLink = screen.getByRole('link', { name: /info@littlelemon\.com/i });
            
            expect(phoneLink).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-yellow-400', 'rounded');
            expect(emailLink).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-yellow-400', 'rounded');
        });

        test('has proper address element', () => {
            render(<Footer />);
            
            const address = screen.getByText('123 Mediterranean Way').closest('address');
            expect(address).toBeInTheDocument();
            expect(address).toHaveClass('not-italic');
        });

        test('has proper heading hierarchy', () => {
            render(<Footer />);
            
            const headings = screen.getAllByRole('heading', { level: 3 });
            expect(headings).toHaveLength(3);
            expect(headings[0]).toHaveTextContent('Little Lemon');
            expect(headings[1]).toHaveTextContent('Contact');
            expect(headings[2]).toHaveTextContent('Hours');
        });
    });

    describe('Styling and Layout', () => {
        test('has proper container structure', () => {
            render(<Footer />);
            
            const footer = screen.getByRole('contentinfo');
            expect(footer).toHaveClass('bg-gray-800', 'text-white', 'py-8');
            
            const container = footer.querySelector('.container');
            expect(container).toHaveClass('container', 'mx-auto', 'px-4');
        });

        test('has responsive grid layout', () => {
            render(<Footer />);
            
            const grid = screen.getByRole('contentinfo').querySelector('.grid');
            expect(grid).toHaveClass('grid', 'md:grid-cols-3', 'gap-8');
        });

        test('has proper text colors', () => {
            render(<Footer />);
            
            const headings = screen.getAllByRole('heading', { level: 3 });
            headings.forEach(heading => {
                expect(heading).toHaveClass('text-lg', 'font-semibold', 'mb-4');
            });
            
            const paragraphs = screen.getAllByText(/A family-owned Mediterranean restaurant/);
            expect(paragraphs[0]).toHaveClass('text-gray-300');
        });

        test('has proper spacing', () => {
            render(<Footer />);
            
            const headings = screen.getAllByRole('heading', { level: 3 });
            headings.forEach(heading => {
                expect(heading).toHaveClass('mb-4');
            });
            
            const address = screen.getByText('123 Mediterranean Way').closest('address');
            expect(address).toHaveClass('space-y-2');
        });

        test('has proper border styling', () => {
            render(<Footer />);
            
            const copyrightSection = screen.getByText(/© \d{4} Little Lemon/).closest('.border-t');
            expect(copyrightSection).toHaveClass('border-t', 'border-gray-700', 'mt-8', 'pt-8');
        });
    });

    describe('Interactive Elements', () => {
        test('contact links have hover effects', () => {
            render(<Footer />);
            
            const phoneLink = screen.getByRole('link', { name: /\(555\) 123-4567/i });
            const emailLink = screen.getByRole('link', { name: /info@littlelemon\.com/i });
            
            expect(phoneLink).toHaveClass('hover:underline');
            expect(emailLink).toHaveClass('hover:underline');
        });

        test('contact links are functional', () => {
            render(<Footer />);
            
            const phoneLink = screen.getByRole('link', { name: /\(555\) 123-4567/i });
            const emailLink = screen.getByRole('link', { name: /info@littlelemon\.com/i });
            
            expect(phoneLink).toHaveAttribute('href', 'tel:+15551234567');
            expect(emailLink).toHaveAttribute('href', 'mailto:info@littlelemon.com');
        });
    });

    describe('Content Verification', () => {
        test('displays correct restaurant description', () => {
            render(<Footer />);
            
            expect(screen.getByText(/A family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist./)).toBeInTheDocument();
        });

        test('displays correct contact information format', () => {
            render(<Footer />);
            
            expect(screen.getByText('Phone:')).toBeInTheDocument();
            expect(screen.getByText('Email:')).toBeInTheDocument();
        });

        test('displays correct hours format', () => {
            render(<Footer />);
            
            expect(screen.getByText('Monday - Sunday')).toBeInTheDocument();
            expect(screen.getByText('11:00 AM - 10:00 PM')).toBeInTheDocument();
        });

        test('displays current year in copyright', () => {
            render(<Footer />);
            
            const currentYear = new Date().getFullYear();
            expect(screen.getByText(`© ${currentYear} Little Lemon. All rights reserved.`)).toBeInTheDocument();
        });
    });

    describe('Responsive Design', () => {
        test('has responsive grid columns', () => {
            render(<Footer />);
            
            const grid = screen.getByRole('contentinfo').querySelector('.grid');
            expect(grid).toHaveClass('md:grid-cols-3');
        });

        test('has responsive container', () => {
            render(<Footer />);
            
            const container = screen.getByRole('contentinfo').querySelector('.container');
            expect(container).toHaveClass('mx-auto', 'px-4');
        });
    });

    describe('Visual Design', () => {
        test('has proper background color', () => {
            render(<Footer />);
            
            const footer = screen.getByRole('contentinfo');
            expect(footer).toHaveClass('bg-gray-800');
        });

        test('has proper text color', () => {
            render(<Footer />);
            
            const footer = screen.getByRole('contentinfo');
            expect(footer).toHaveClass('text-white');
        });

        test('has proper secondary text color', () => {
            render(<Footer />);
            
            const paragraphs = screen.getAllByText(/A family-owned Mediterranean restaurant/);
            expect(paragraphs[0]).toHaveClass('text-gray-300');
        });

        test('has proper border color', () => {
            render(<Footer />);
            
            const copyrightSection = screen.getByText(/© \d{4} Little Lemon/).closest('.border-t');
            expect(copyrightSection).toHaveClass('border-gray-700');
        });
    });

    describe('Structure and Organization', () => {
        test('has three main sections', () => {
            render(<Footer />);
            
            const headings = screen.getAllByRole('heading', { level: 3 });
            expect(headings).toHaveLength(3);
            
            const sectionTitles = headings.map(heading => heading.textContent);
            expect(sectionTitles).toContain('Little Lemon');
            expect(sectionTitles).toContain('Contact');
            expect(sectionTitles).toContain('Hours');
        });

        test('has proper section organization', () => {
            render(<Footer />);
            
            const footer = screen.getByRole('contentinfo');
            const grid = footer.querySelector('.grid');
            const copyrightSection = footer.querySelector('.border-t');
            
            expect(grid).toBeInTheDocument();
            expect(copyrightSection).toBeInTheDocument();
        });

        test('has proper spacing between sections', () => {
            render(<Footer />);
            
            const copyrightSection = screen.getByText(/© \d{4} Little Lemon/).closest('.border-t');
            expect(copyrightSection).toHaveClass('mt-8', 'pt-8');
        });
    });
}); 