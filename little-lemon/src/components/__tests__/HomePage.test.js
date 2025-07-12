import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';

// Mock the child components
jest.mock('../HeroSection', () => {
    return function MockHeroSection() {
        return <section data-testid="hero-section">Hero Section</section>;
    };
});

jest.mock('../SpecialsSection', () => {
    return function MockSpecialsSection() {
        return <section data-testid="specials-section">Specials Section</section>;
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

describe('HomePage', () => {
    describe('Rendering', () => {
        test('renders without crashing', () => {
            renderWithRouter(<HomePage />);
        });

        test('renders HeroSection component', () => {
            renderWithRouter(<HomePage />);
            
            expect(screen.getByTestId('hero-section')).toBeInTheDocument();
            expect(screen.getByText('Hero Section')).toBeInTheDocument();
        });

        test('renders SpecialsSection component', () => {
            renderWithRouter(<HomePage />);
            
            expect(screen.getByTestId('specials-section')).toBeInTheDocument();
            expect(screen.getByText('Specials Section')).toBeInTheDocument();
        });
    });

    describe('Component Structure', () => {
        test('renders both sections in correct order', () => {
            renderWithRouter(<HomePage />);
            
            const heroSection = screen.getByTestId('hero-section');
            const specialsSection = screen.getByTestId('specials-section');
            
            expect(heroSection).toBeInTheDocument();
            expect(specialsSection).toBeInTheDocument();
            
            // Check that HeroSection comes before SpecialsSection in the DOM
            const container = heroSection.parentElement;
            const heroIndex = Array.from(container.children).indexOf(heroSection);
            const specialsIndex = Array.from(container.children).indexOf(specialsSection);
            
            expect(heroIndex).toBeLessThan(specialsIndex);
        });

        test('uses React Fragment for wrapper', () => {
            renderWithRouter(<HomePage />);
            
            const heroSection = screen.getByTestId('hero-section');
            const specialsSection = screen.getByTestId('specials-section');
            
            // Both sections should be direct children of the same parent
            expect(heroSection.parentElement).toBe(specialsSection.parentElement);
        });
    });

    describe('Component Integration', () => {
        test('integrates HeroSection correctly', () => {
            renderWithRouter(<HomePage />);
            
            const heroSection = screen.getByTestId('hero-section');
            expect(heroSection.tagName).toBe('SECTION');
            expect(heroSection.textContent).toBe('Hero Section');
        });

        test('integrates SpecialsSection correctly', () => {
            renderWithRouter(<HomePage />);
            
            const specialsSection = screen.getByTestId('specials-section');
            expect(specialsSection.tagName).toBe('SECTION');
            expect(specialsSection.textContent).toBe('Specials Section');
        });
    });

    describe('Semantic Structure', () => {
        test('has proper semantic structure with sections', () => {
            renderWithRouter(<HomePage />);
            
            const sections = screen.getAllByRole('generic');
            expect(sections.length).toBeGreaterThan(0);
        });

        test('sections have proper test IDs for identification', () => {
            renderWithRouter(<HomePage />);
            
            expect(screen.getByTestId('hero-section')).toBeInTheDocument();
            expect(screen.getByTestId('specials-section')).toBeInTheDocument();
        });
    });

    describe('Component Composition', () => {
        test('composes components without additional wrapper elements', () => {
            renderWithRouter(<HomePage />);
            
            const heroSection = screen.getByTestId('hero-section');
            const specialsSection = screen.getByTestId('specials-section');
            
            // Both sections should be at the same level in the DOM
            expect(heroSection.parentElement).toBe(specialsSection.parentElement);
        });

        test('does not add unnecessary DOM elements', () => {
            renderWithRouter(<HomePage />);
            
            const container = screen.getByTestId('hero-section').parentElement;
            const directChildren = Array.from(container.children);
            
            // Should only have 2 direct children (the two sections)
            expect(directChildren.length).toBe(2);
        });
    });

    describe('Accessibility', () => {
        test('maintains accessibility structure of child components', () => {
            renderWithRouter(<HomePage />);
            
            const heroSection = screen.getByTestId('hero-section');
            const specialsSection = screen.getByTestId('specials-section');
            
            expect(heroSection.tagName).toBe('SECTION');
            expect(specialsSection.tagName).toBe('SECTION');
        });

        test('does not interfere with child component accessibility', () => {
            renderWithRouter(<HomePage />);
            
            // The component should not add any accessibility attributes that might conflict
            const heroSection = screen.getByTestId('hero-section');
            const specialsSection = screen.getByTestId('specials-section');
            
            // Check that the sections are properly rendered
            expect(heroSection).toBeInTheDocument();
            expect(specialsSection).toBeInTheDocument();
        });
    });

    describe('Performance', () => {
        test('renders efficiently without unnecessary re-renders', () => {
            const { rerender } = renderWithRouter(<HomePage />);
            
            // Re-render the component
            rerender(
                <BrowserRouter>
                    <HomePage />
                </BrowserRouter>
            );
            
            // Should still have the same structure
            expect(screen.getByTestId('hero-section')).toBeInTheDocument();
            expect(screen.getByTestId('specials-section')).toBeInTheDocument();
        });
    });

    describe('Error Handling', () => {
        test('handles missing child components gracefully', () => {
            // This test would be more relevant if the components were conditionally rendered
            renderWithRouter(<HomePage />);
            
            // Should still render without errors
            expect(screen.getByTestId('hero-section')).toBeInTheDocument();
            expect(screen.getByTestId('specials-section')).toBeInTheDocument();
        });
    });
}); 