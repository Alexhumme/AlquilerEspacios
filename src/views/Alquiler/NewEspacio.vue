<template>
    <el-header>
        <Navbar />
    </el-header>

    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Agregar un nuevo prestamo de espacio</span>
            </div>
        </template>
        <el-form :model="form" :rules="rules" :onsubmit="submit">
            <el-row>
                <el-col>

                    <el-form-item label="Espacio solicitado" prop="espacioSolicitado">
                        <el-input v-model="form.espacioSolicitado" required />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="Fecha de solicitud" prop="fechaSolicitud">
                        <el-date-picker v-model="form.fechaSolicitud" type="date" placeholder="Elije fecha"
                            style="width: 100%" required />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Fecha del Evento" prop="fechaEvento">
                        <el-date-picker v-model="form.fechaEvento" type="date" placeholder="Elije fecha"
                            style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item prop="horaInicio">
                        <el-time-picker v-model="form.horaInicio" placeholder="Hora de Inicio" style="width: 200px" />
                    </el-form-item>
                </el-col>
                <el-col :span="2" class="text-center">
                    <el-form-item class="text-center">
                        -
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item prop="horaFinal">
                        <el-time-picker v-model="form.horaFinal" placeholder="Hora de Finalización" style="width: 200px" />
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <div class="sub-title-form">Datos del solicitante</div>
                </el-col>
            </el-row>
            <el-form-item label="Nombre Completo:" prop="solicitante" label-width="140px">
                <el-input v-model="form.solicitante" />
            </el-form-item>
            <el-form-item label="No. Documento:" prop="documento" label-width="140px">
                <el-input v-model.number="form.documento" />
            </el-form-item>
            <el-form-item label="Numero de Telefono:" prop="telefono" label-width="140px">
                <el-input v-model="form.telefono" />
            </el-form-item>
            <el-form-item label="Dirección:" prop="direccion" label-width="140px">
                <el-input v-model="form.direccion" />
            </el-form-item>
            <el-form-item label="Correo:" prop="correo" label-width="140px">
                <el-input v-model="form.correo" />
            </el-form-item>
            <el-form-item label="Rep. Empresa:" prop="empresa" label-width="140px">
                <el-input v-model="form.empresa" />
            </el-form-item>

            <el-form-item label="Valor Alquiler:" prop="valor" label-width="140px">
                <el-input v-model.number="form.valor" />
            </el-form-item>
            <el-form-item label="Contraprestación:" prop="contraprestacion" label-width="140px">
                <el-input v-model.number="form.contraprestacion" />
            </el-form-item>

            <div class="box-card observacion">
                <p style="font-size: 0.5rem;">
                    <strong>Observación:</strong> En ningún caso el usuario podrá colocar clavos, tornillos, cintas
                    pegantes, ni pegamento sobre las paredes o muros. Esto para evitar el daño general y deterioro de la
                    pintura.
    
                    El usuario deberá responder por cualquier daño o pérdida parcial o total, será su responsabilidad devolver
                    el espacio en buen estado y limpio.
                </p>
            </div>
            <el-row :gutter="20">
                <el-col :span="24">
                    <div class="sub-title-form">Inventario para la entrega</div> 
                </el-col>
            </el-row>
            <el-row justify="center">
                <el-col :span="12">
                    <el-form-item label="Paredes" label-width="140px">
                        <el-radio-group v-model="form.paredes">
                            <el-radio-button label="Buen estado" />
                            <el-radio-button label="Regular estado" />
                            <el-radio-button label="mal estado" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Pisos" label-width="140px">
                        <el-radio-group v-model="form.pisos">
                            <el-radio-button label="Buen estado" />
                            <el-radio-button label="Regular estado" />
                            <el-radio-button label="mal estado" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Puertas" label-width="140px">
                        <el-radio-group v-model="form.puertas">
                            <el-radio-button label="Buen estado" />
                            <el-radio-button label="Regular estado" />
                            <el-radio-button label="mal estado" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Iluminación" label-width="140px">
                        <el-radio-group v-model="form.iluminacion">
                            <el-radio-button label="Buen estado" />
                            <el-radio-button label="Regular estado" />
                            <el-radio-button label="mal estado" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Sanitarios " label-width="140px">
                        <el-radio-group v-model="form.sanitarios">
                            <el-radio-button label="Buen estado" />
                            <el-radio-button label="Regular estado" />
                            <el-radio-button label="mal estado" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Ventanas " label-width="140px">
                        <el-radio-group v-model="form.ventanas">
                            <el-radio-button label="Buen estado" />
                            <el-radio-button label="Regular estado" />
                            <el-radio-button label="mal estado" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Aire Acondicionado " label-width="140px">
                        <el-radio-group v-model="form.aire">
                            <el-radio-button label="Buen estado" type="success" />
                            <el-radio-button label="Regular estado" />
                            <el-radio-button label="mal estado" />
                        </el-radio-group>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row justify="end">
                <el-col :span="4">
                    <el-button type="primary" native-type="submit" size="large">Crear</el-button>
                    <el-button native-type="reset" size="large">reset</el-button>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
</template>
  

<script>
import { Post } from '@/service'
import Navbar from '../../components/Navbar.vue';

export default {
    data() {
        return {
            rules: {
                espacioSolicitado: [{ required: true }],
                fechaEvento: [{ required: true }],
                fechaSolicitud: [{ required: true }],
                solicitante: [{ required: true }],
                documento: [{ required: true }, { type: 'number' }],
                valor: [{ required: true }, { type: 'number' }],
                contraprestacion: [{ required: true }, { type: 'number' }],
                correo: [{ required: true }, { type: 'email' }],
                horaInicio: [{ required: true }],
                horaFinal: [{ required: true }],
            },
            form: {
                espacioSolicitado: '',
                fechaSolicitud: '',
                horaInicio: '',
                horaFinal: '',
                solicitante: '',
                documento: 0,
                telefono: '',
                direccion: '',
                correo: '',
                empresa: '',
                valor: 0,
                contraprestacion: 0,
                paredes: '',
                pisos: '',
                puertas: '',
                iluminacion: '',
                sanitarios: '',
                ventanas: '',
                aire: '',
            }
        }
    },
    methods: {
        async submit(e) {
            e.preventDefault();
            try {
                console.log("hola")
                await Post.create({ ...this.form })
                this.resetForm()
            } catch (error) {
                alert(error.message)
            }
        },
        resetForm() {
            this.form = {
                espacioSolicitado: '',
                fechaSolicitud: '',
                horaInicio: '',
                horaFinal: '',
                solicitante: '',
                documento: 0,
                telefono: '',
                correo: '',
                empresa: '',
                valor: 0,
                contraprestacion: 0,
                paredes: '',
                pisos: '',
                puertas: '',
                iluminacion: '',
                sanitarios: '',
                ventanas: '',
                aire: ''
            }
        }
    }
}
</script>
  

<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-card {
    padding: 40px;
    padding-bottom: 20px;
}
.sub-title-form{
    margin: 0px 10px 20px 5px;
    padding-bottom: 5px;
    border-bottom: solid 1px rgb(221, 221, 221);

}
.observacion{
    border: solid 1px rgb(218, 218, 218);
    color: rgb(117, 117, 117);
    padding: 15px;
    border-radius: 5px;
    margin: 15px 0px;
}
</style>

