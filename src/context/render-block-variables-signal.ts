import { signal } from '@preact/signals'

export type RenderBlockVariables = Record<string, string>

export const variablesRenderBlockSignal = signal<RenderBlockVariables>({})

export const setRenderBlockVariables = (newVars: RenderBlockVariables) => {
	variablesRenderBlockSignal.value = newVars
}

export const getRenderBlockVariable = (key: string): string => {
	return variablesRenderBlockSignal.value[key] ?? `{${key}}`
}
