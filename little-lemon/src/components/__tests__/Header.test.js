import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

// Mock the Navigation component
jest.mock('../Navigation', () => {
    return function MockNavigation() {
        return <nav data-testid="navigation">Navigation</nav>;
    };
});

// Wrapper component to provide router context
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('Header', () => {
    describe('Rendering', () => {
        test('renders header with proper role', () => {
            renderWithRouter(<Header />);
            
            expect(screen.getByRole('banner')).toBeInTheDocument();
        });

        test('renders logo container', () => {
            renderWithRouter(<Header />);
            
            const logoContainer = screen.getByText('Little Lemon Restaurant - Home').closest('.logo-container');
            expect(logoContainer).toBeInTheDocument();
            expect(logoContainer).toHaveClass('logo-container', 'flex-shrink-0');
        });

        test('renders logo image with correct attributes', () => {
            renderWithRouter(<Header />);
            
            const logoImage = screen.getByAltText('Little Lemon Restaurant Logo');
            expect(logoImage).toBeInTheDocument();
            expect(logoImage).toHaveAttribute('src', '../icons/Logo.svg');
            expect(logoImage).toHaveClass('logo-image');
        });

        test('renders navigation component', () => {
            renderWithRouter(<Header />);
            
            expect(screen.getByTestId('navigation')).toBeInTheDocument();
        });
    });

    describe('Logo Link', () => {
        test('logo links to home page', () => {
            renderWithRouter(<Header />);
            
            const logoLink = screen.getByRole('link', { name: /little lemon restaurant - home/i });
            expect(logoLink).toHaveAttribute('href', '/');
        });

        test('logo has proper ARIA label', () => {
            renderWithRouter(<Header />);
            
            const logoLink = screen.getByRole('link', { name: /little lemon restaurant - home/i });
            expect(logoLink).toHaveAttribute('aria-label', 'Little Lemon Restaurant - Home');
        });

        test('logo has hover effect', () => {
            renderWithRouter(<Header />);
            
            const logoLink = screen.getByRole('link', { name: /little lemon restaurant - home/i });
            expect(logoLink).toHaveClass('hover:opacity-80', 'transition-opacity', 'duration-200');
        });
    });

    describe('Layout and Styling', () => {
        test('has proper container structure', () => {
            renderWithRouter(<Header />);
            
            const header = screen.getByRole('banner');
            expect(header).toHaveClass('w-full', 'bg-white', 'shadow-md', 'relative');
            
            const container = header.querySelector('.container');
            expect(container).toHaveClass('container', 'mx-auto', 'px-4', 'py-4', 'flex', 'justify-between', 'items-center');
        });

        test('has proper flex layout', () => {
            renderWithRouter(<Header />);
            
            const container = screen.getByRole('banner').querySelector('.container');
            expect(container).toHaveClass('flex', 'justify-between', 'items-center');
        });

        test('logo container has proper flex properties', () => {
            renderWithRouter(<Header />);
            
            const logoContainer = screen.getByText('Little Lemon Restaurant - Home').closest('.logo-container');
            expect(logoContainer).toHaveClass('flex-shrink-0');
        });
    });

    describe('Accessibility', () => {
        test('has proper semantic structure', () => {
            renderWithRouter(<Header />);
            
            expect(screen.getByRole('banner')).toBeInTheDocument();
            expect(screen.getByRole('link')).toBeInTheDocument();
            expect(screen.getByRole('img')).toBeInTheDocument();
        });

        test('logo image has proper alt text', () => {
            renderWithRouter(<Header />);
            
            const logoImage = screen.getByAltText('Little Lemon Restaurant Logo');
            expect(logoImage).toBeInTheDocument();
        });

        test('logo link has descriptive ARIA label', () => {
            renderWithRouter(<Header />);
            
            const logoLink = screen.getByRole('link', { name: /little lemon restaurant - home/i });
            expect(logoLink).toBeInTheDocument();
        });
    });

    describe('Responsive Design', () => {
        test('has responsive container classes', () => {
            renderWithRouter(<Header />);
            
            const container = screen.getByRole('banner').querySelector('.container');
            expect(container).toHaveClass('mx-auto', 'px-4');
        });

        test('has proper spacing classes', () => {
            renderWithRouter(<Header />);
            
            const container = screen.getByRole('banner').querySelector('.container');
            expect(container).toHaveClass('py-4');
        });
    });

    describe('Visual Design', () => {
        test('has proper background and shadow', () => {
            renderWithRouter(<Header />);
            
            const header = screen.getByRole('banner');
            expect(header).toHaveClass('bg-white', 'shadow-md');
        });

        test('has proper positioning', () => {
            renderWithRouter(<Header />);
            
            const header = screen.getByRole('banner');
            expect(header).toHaveClass('relative');
        });

        test('has full width', () => {
            renderWithRouter(<Header />);
            
            const header = screen.getByRole('banner');
            expect(header).toHaveClass('w-full');
        });
    });

    describe('Component Integration', () => {
        test('integrates Navigation component correctly', () => {
            renderWithRouter(<Header />);
            
            const navigation = screen.getByTestId('navigation');
            expect(navigation).toBeInTheDocument();
            expect(navigation.textContent).toBe('Navigation');
        });

        test('navigation is positioned correctly in layout', () => {
            renderWithRouter(<Header />);
            
            const container = screen.getByRole('banner').querySelector('.container');
            const navigation = screen.getByTestId('navigation');
            
            expect(container).toContainElement(navigation);
        });
    });
}); 