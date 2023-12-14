import {z} from 'zod'
export const uploadSchema = z.object({
    imagen:z.string({
        required_error:'Imagen es requerido'
        }),
    usuario: z.string({
        required_error:'Usuario es requerido'
        }),
    titulo: z.string({
        required_error: 'Titulo es requerida'
        })
})
export const modifySchema = z.object({
    imagen:z.string({
        required_error:'Imagen es requerido'
        }),
    usuario: z.string({
        required_error:'Usuario es requerido'
        }),
    titulo: z.string({
        required_error: 'Titulo es requerida'
        })
})