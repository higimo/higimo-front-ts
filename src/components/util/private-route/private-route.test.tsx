// PrivateRoute.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import render from 'preact-render-to-string';
import { PrivateRoute } from '.';

// Мокаем зависимости
vi.mock('hook/use-auth', () => ({
	useAuth: vi.fn()
}));

vi.mock('preact-iso', () => ({
	Route: ({ component: Component, ...props }) => (Component ? <Component {...props} /> : null)
}));

vi.mock('components/ui/loading', () => ({
	Loading: () => <div data-testid="loading">Loading...</div>
}));

// Импортируем мокированный модуль для управления возвращаемыми значениями
import * as useAuthModule from 'hook/use-auth';
import { Fragment } from 'preact/jsx-runtime';

const MockComponent = () => <div>Secret Dashboard</div>;

describe('PrivateRoute', () => {
	const mockRedirectToLogin = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		// Базовая реализация по умолчанию
		vi.mocked(useAuthModule.useAuth).mockReturnValue({
			isAuth: false,
			isAuthLoaded: false,
			redirectToLogin: mockRedirectToLogin,
			routeTo: vi.fn(),
		});
	});

	it('Показывает лоадер, пока загружается', () => {
		const html = render(<PrivateRoute path="/test" component={MockComponent} />);
		expect(html).toContain('Loading...');
		expect(mockRedirectToLogin).not.toHaveBeenCalled();
	});

	it('перенаправляет неавторизованных и ничего не выводит', () => {
		vi.mocked(useAuthModule.useAuth).mockReturnValueOnce({
			isAuth: false,
			isAuthLoaded: true,
			redirectToLogin: mockRedirectToLogin,
			routeTo: vi.fn(),
		});

		const html = render(<PrivateRoute path="/test" component={MockComponent} />);
		expect(mockRedirectToLogin).toHaveBeenCalledTimes(1);
		expect(html).toBe(''); // после редиректа компонент не рендерит ничего
	});

	it('рендерит роут для авторизованных', () => {
		vi.mocked(useAuthModule.useAuth).mockReturnValueOnce({
			isAuth: true,
			isAuthLoaded: true,
			redirectToLogin: mockRedirectToLogin,
			routeTo: vi.fn(),
		});

		const html = render(<PrivateRoute path="/dashboard" component={MockComponent} />);
		expect(html).toContain('Secret Dashboard');
		expect(mockRedirectToLogin).not.toHaveBeenCalled();
	});
});
