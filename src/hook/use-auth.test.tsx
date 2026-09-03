import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/preact'
import sendRequest from 'utils/api/send-request'
import { useLocation } from 'preact-iso'
import { API_ROUTE } from 'dic/API_ROUTE'

// TODO: move to hook/fetch
vi.mock('utils/api/send-request', () => ({
	default: vi.fn()
}));

vi.mock('dic/api-route', () => ({
	API_ROUTE: {
		authMe: '/api/auth/me'
	}
}));

vi.mock('preact-iso', () => ({
	useLocation: vi.fn()
}));

describe('useAuth', () => {
	let useAuthModule: any;

	beforeEach(async () => {
		vi.clearAllMocks();
		vi.resetModules();

		(useLocation as any).mockReturnValue({
			route: vi.fn(),
			path: '/mock'
		});

		useAuthModule = await import('hook/use-auth');
	});

	it('возвращает объект с ожидаемыми полями', () => {
		(sendRequest as any).mockResolvedValueOnce(undefined);
		const { result } = renderHook(() => useAuthModule.useAuth());

		expect(result.current).toHaveProperty('isAuth');
		expect(result.current).toHaveProperty('isAuthLoaded');
		expect(result.current).toHaveProperty('redirectToLogin');
		expect(result.current).toHaveProperty('routeTo');
	});

	it('отправляет запрос при монтировании', async () => {
		(sendRequest as any).mockResolvedValueOnce(undefined);
		renderHook(() => useAuthModule.useAuth());

		await waitFor(() => {
			expect(sendRequest).toHaveBeenCalledTimes(1);
		});

		expect(sendRequest).toHaveBeenCalledWith(API_ROUTE.authMe);
	});

	it('при успешном запросе авторизует', async () => {
		(sendRequest as any).mockResolvedValueOnce(undefined);
		const { result } = renderHook(() => useAuthModule.useAuth());

		expect(result.current.isAuthLoaded).toBe(false);
		expect(result.current.isAuth).toBe(false);

		await waitFor(() => {
			expect(result.current.isAuthLoaded).toBe(true);
		});

		expect(result.current.isAuth).toBe(true);
	});

	it('при ошибочном запросе, сообщает о неавторизованности', async () => {
		(sendRequest as any).mockRejectedValueOnce(undefined);
		const { result } = renderHook(() => useAuthModule.useAuth());

		expect(result.current.isAuthLoaded).toBe(false);
		expect(result.current.isAuth).toBe(false);

		await waitFor(() => {
			expect(result.current.isAuthLoaded).toBe(true);
			expect(result.current.isAuth).toBe(false);
		});
	});

	it('redirectToLogin указывает backpath текущего роута', () => {
		(sendRequest as any).mockRejectedValueOnce(new Error('Unauthorized'));
		const mockRoute = vi.fn();
		(useLocation as any).mockReturnValueOnce({
			route: mockRoute,
			path: '/protected-page'
		});

		const { result } = renderHook(() => useAuthModule.useAuth());

		act(() => {
			result.current.redirectToLogin();
		});

		expect(mockRoute).toHaveBeenCalledWith('/login/?backpath=/protected-page', true);
	});

	it('сделает единственный запрос, даже при множестве монтирований', async () => {
		(sendRequest as any).mockResolvedValueOnce(undefined);

		const TestComponent1 = () => {
			useAuthModule.useAuth();
			useAuthModule.useAuth();
			return null;
		};
		const TestComponent2 = () => {
			useAuthModule.useAuth();
			useAuthModule.useAuth();
			return null;
		};

		renderHook(() => TestComponent1());
		renderHook(() => TestComponent2());

		await waitFor(() => {
			expect(sendRequest).toHaveBeenCalledTimes(1);
		});
	});

	it('не сделает повторных запросов при ререндере и повторном монтировании', async () => {
		(sendRequest as any).mockResolvedValueOnce(undefined);

		const { rerender } = renderHook(() => useAuthModule.useAuth());

		await waitFor(() => {
			expect(sendRequest).toHaveBeenCalledTimes(1);
		});

		rerender(() => useAuthModule.useAuth());

		await waitFor(() => {
			expect(sendRequest).toHaveBeenCalledTimes(1);
		});
	});

	it('показывает isAuthLoaded = false, пока ждёт ответа сервера', async () => {
		(sendRequest as any).mockImplementationOnce(() => new Promise(() => {}));

		const { result } = renderHook(() => useAuthModule.useAuth());

		expect(result.current.isAuthLoaded).toBe(false);
		expect(result.current.isAuth).toBe(false);
	});
});
