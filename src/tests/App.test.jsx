import { describe, it, test, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router-dom';

import App from '/src/App.jsx';

describe('App Routing', () => {
      it('renders header, homepage, and footer by default', () => {
            const { asFragment } = render(<App />, { wrapper: MemoryRouter });

            expect(asFragment()).toMatchSnapshot();
      });

      it('navigates to shopping page by clicking the shop button', async () => {
            const user = userEvent.setup();

            render(
                  <MemoryRouter initialEntries={['/']}>
                        <App />
                  </MemoryRouter>
            );

            const shopButton = screen.getByRole('link', { name: /shop now/i });
            await user.click(shopButton);

            expect(
                  await screen.findByText(/products/i)
            ).toBeInTheDocument();
      })

      it('navigates checkout page by clicking the checkout link', async () => {
            const user = userEvent.setup();

            render(
                  <MemoryRouter initialEntries={['/']}>
                        <App />
                  </MemoryRouter>
            );

            const container = screen.getByRole('banner');
            const checkoutLink = within(container).getByRole('link', { name: /checkout/i });
            await user.click(checkoutLink);

            expect(
                  await screen.findByText(/checkout form/i)
            ).toBeInTheDocument();
      })

      it('navigates to 404 page if URL does not exists', () => {
            render(
                  <MemoryRouter initialEntries={['/random-page']}>
                        <App />
                  </MemoryRouter>
            );

            expect(screen.getByText(/error 404: page not found/i)).toBeInTheDocument();
      })
});
