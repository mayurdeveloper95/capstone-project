import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeroSection from '../HeroSection';

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// Wrapper component to provide router context
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    );
};

describe('HeroSection', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        test('renders hero section with proper role', () => {
            renderWithRouter(<HeroSection />);
            
            expect(screen.getByRole('banner')).toBeInTheDocument();
        });

        test('renders main heading with correct text', () => {
            renderWithRouter(<HeroSection />);
            
            expect(screen.getByText('Little Lemon')).toBeInTheDocument();
            expect(screen.getByText('Little Lemon')).toHaveAttribute('id', 'hero-heading');
        });

        test('renders location heading', () => {
            renderWithRouter(<HeroSection />);
            
            expect(screen.getByText('Chicago')).toBeInTheDocument();
        });

        test('renders description text', () => {
            renderWithRouter(<HeroSection />);
            
            expect(screen.getByText(/We are a family owned Mediterranean restaurant/)).toBeInTheDocument();
        });

        test('renders reserve button', () => {
            renderWithRouter(<HeroSection />);
            
            expect(screen.getByRole('button', { name: /reserve a table/i })).toBeInTheDocument();
        });

        test('renders hero image', () => {
            renderWithRouter(<HeroSection />);
            
            const heroImage = screen.getByAltText('Delicious Mediterranean dishes served at Little Lemon restaurant');
            expect(heroImage).toBeInTheDocument();
            expect(heroImage).toHaveAttribute('src', '../icons/restauranfood.jpg');
        });
    });

    describe('Navigation', () => {
        test('navigates to booking page when reserve button is clicked', () => {
            renderWithRouter(<HeroSection />);
            
            const reserveButton = screen.getByRole('button', { name: /reserve a table/i });
            fireEvent.click(reserveButton);
            
            expect(mockNavigate).toHaveBeenCalledWith('/booking');
        });

        test('calls handleReserveClick function on button click', () => {
            renderWithRouter(<HeroSection />);
            
            const reserveButton = screen.getByRole('button', { name: /reserve a table/i });
            fireEvent.click(reserveButton);
            
            expect(mockNavigate).toHaveBeenCalledTimes(1);
        });
    });

    describe('Accessibility', () => {
        test('has proper ARIA labels and roles', () => {
            renderWithRouter(<HeroSection />);
            
            expect(screen.getByRole('banner')).toHaveAttribute('aria-labelledby', 'hero-heading');
            expect(screen.getByText('Little Lemon')).toHaveAttribute('id', 'hero-heading');
        });

        test('reserve button has proper ARIA label', () => {
            renderWithRouter(<HeroSection />);
            
            const reserveButton = screen.getByRole('button', { name: /reserve a table/i });
            expect(reserveButton).toHaveAttribute('aria-label', 'Reserve a table at Little Lemon restaurant');
        });

        test('hero image has descriptive alt text', () => {
            renderWithRouter(<HeroSection />);
            
            const heroImage = screen.getByAltText('Delicious Mediterranean dishes served at Little Lemon restaurant');
            expect(heroImage).toBeInTheDocument();
        });

        test('has proper semantic structure', () => {
            renderWithRouter(<HeroSection />);
            
            expect(screen.getByRole('banner')).toBeInTheDocument();
            expect(screen.getByRole('button')).toBeInTheDocument();
            expect(screen.getByRole('img')).toBeInTheDocument();
        });
    });

    describe('Styling and Layout', () => {
        test('has proper container structure', () => {
            renderWithRouter(<HeroSection />);
            
            const heroSection = screen.getByRole('banner');
            expect(heroSection).toHaveClass('relative', 'bg-[#5E7263]', 'w-full', 'py-10');
            
            const container = heroSection.querySelector('.max-w-6xl');
            expect(container).toHaveClass('max-w-6xl', 'mx-auto', 'flex', 'flex-col', 'md:flex-row', 'items-center', 'justify-between', 'px-4', 'md:px-8');
        });

        test('has responsive flex layout', () => {
            renderWithRouter(<HeroSection />);
            
            const container = screen.getByRole('banner').querySelector('.max-w-6xl');
            expect(container).toHaveClass('flex', 'flex-col', 'md:flex-row', 'items-center', 'justify-between');
        });

        test('text content has proper responsive classes', () => {
            renderWithRouter(<HeroSection />);
            
            const mainHeading = screen.getByText('Little Lemon');
            const locationHeading = screen.getByText('Chicago');
            const description = screen.getByText(/We are a family owned Mediterranean restaurant/);
            
            expect(mainHeading).toHaveClass('text-3xl', 'md:text-5xl');
            expect(locationHeading).toHaveClass('text-lg', 'md:text-2xl');
            expect(description).toHaveClass('text-sm', 'md:text-lg');
        });

        test('reserve button has proper styling', () => {
            renderWithRouter(<HeroSection />);
            
            const reserveButton = screen.getByRole('button', { name: /reserve a table/i });
            expect(reserveButton).toHaveClass('bg-[#FFD600]', 'hover:bg-yellow-400', 'text-black', 'font-semibold', 'py-2', 'px-6', 'rounded', 'transition-colors', 'duration-200', 'shadow-md');
        });

        test('hero image has proper styling', () => {
            renderWithRouter(<HeroSection />);
            
            const heroImage = screen.getByAltText('Delicious Mediterranean dishes served at Little Lemon restaurant');
            expect(heroImage).toHaveClass('rounded-lg', 'w-full', 'h-full', 'md:w-80', 'md:h-80', 'object-cover', 'shadow-lg');
        });
    });

    describe('Content Verification', () => {
        test('displays correct restaurant name', () => {
            renderWithRouter(<HeroSection />);
            
            expect(screen.getByText('Little Lemon')).toBeInTheDocument();
        });

        test('displays correct location', () => {
            renderWithRouter(<HeroSection />);
            
            expect(screen.getByText('Chicago')).toBeInTheDocument();
        });

        test('displays correct description', () => {
            renderWithRouter(<HeroSection />);
            
            const description = screen.getByText(/We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist./);
            expect(description).toBeInTheDocument();
        });

        test('displays correct button text', () => {
            renderWithRouter(<HeroSection />);
            
            expect(screen.getByText('Reserve a Table')).toBeInTheDocument();
        });
    });

    describe('Responsive Design', () => {
        test('has responsive text sizing', () => {
            renderWithRouter(<HeroSection />);
            
            const mainHeading = screen.getByText('Little Lemon');
            const locationHeading = screen.getByText('Chicago');
            const description = screen.getByText(/We are a family owned Mediterranean restaurant/);
            const button = screen.getByRole('button', { name: /reserve a table/i });
            
            expect(mainHeading).toHaveClass('text-3xl', 'md:text-5xl');
            expect(locationHeading).toHaveClass('text-lg', 'md:text-2xl');
            expect(description).toHaveClass('text-sm', 'md:text-lg');
            expect(button).toHaveClass('text-sm', 'md:text-lg');
        });

        test('has responsive layout classes', () => {
            renderWithRouter(<HeroSection />);
            
            const container = screen.getByRole('banner').querySelector('.max-w-6xl');
            const textContainer = container.querySelector('.md\\:w-1\\/2');
            const imageContainer = container.querySelector('.md\\:w-1\\/2:last-child');
            
            expect(container).toHaveClass('flex-col', 'md:flex-row');
            expect(textContainer).toHaveClass('w-full', 'md:w-1/2');
            expect(imageContainer).toHaveClass('w-full', 'md:w-1/2');
        });

        test('has responsive padding', () => {
            renderWithRouter(<HeroSection />);
            
            const container = screen.getByRole('banner').querySelector('.max-w-6xl');
            expect(container).toHaveClass('px-4', 'md:px-8');
        });
    });

    describe('Interactive Elements', () => {
        test('reserve button has hover effect', () => {
            renderWithRouter(<HeroSection />);
            
            const reserveButton = screen.getByRole('button', { name: /reserve a table/i });
            expect(reserveButton).toHaveClass('hover:bg-yellow-400');
        });

        test('reserve button has transition effect', () => {
            renderWithRouter(<HeroSection />);
            
            const reserveButton = screen.getByRole('button', { name: /reserve a table/i });
            expect(reserveButton).toHaveClass('transition-colors', 'duration-200');
        });

        test('button is clickable and functional', () => {
            renderWithRouter(<HeroSection />);
            
            const reserveButton = screen.getByRole('button', { name: /reserve a table/i });
            expect(reserveButton).not.toBeDisabled();
            
            fireEvent.click(reserveButton);
            expect(mockNavigate).toHaveBeenCalledWith('/booking');
        });
    });

    describe('Visual Design', () => {
        test('has proper background color', () => {
            renderWithRouter(<HeroSection />);
            
            const heroSection = screen.getByRole('banner');
            expect(heroSection).toHaveClass('bg-[#5E7263]');
        });

        test('has proper text colors', () => {
            renderWithRouter(<HeroSection />);
            
            const mainHeading = screen.getByText('Little Lemon');
            const locationHeading = screen.getByText('Chicago');
            const description = screen.getByText(/We are a family owned Mediterranean restaurant/);
            
            expect(mainHeading).toHaveClass('text-[#D9A900]');
            expect(locationHeading).toHaveClass('text-white');
            expect(description).toHaveClass('text-white');
        });

        test('has proper button colors', () => {
            renderWithRouter(<HeroSection />);
            
            const reserveButton = screen.getByRole('button', { name: /reserve a table/i });
            expect(reserveButton).toHaveClass('bg-[#FFD600]', 'text-black');
        });

        test('has proper shadows', () => {
            renderWithRouter(<HeroSection />);
            
            const reserveButton = screen.getByRole('button', { name: /reserve a table/i });
            const heroImage = screen.getByAltText('Delicious Mediterranean dishes served at Little Lemon restaurant');
            
            expect(reserveButton).toHaveClass('shadow-md');
            expect(heroImage).toHaveClass('shadow-lg');
        });
    });
}); 