import {
     Box,
     FormControlLabel,
     Slider,
     Stack,
     TextField
} from "@mui/material";
import { evaluate } from "mathjs";
import { useEffect, useRef, useState } from "react";

const width = 800;
const height = 600;

function App() {
     const [text, setText] = useState("");
     const [step, setStep] = useState(0.1);
     const [xBounds, setXBounds] = useState([-10, 10]);
     const [yBounds, setYBounds] = useState([-10, 10]);
     const canvasRef = useRef<HTMLCanvasElement>(null);

     useEffect(() => {
          if (!canvasRef.current) return;

          const ctx = canvasRef.current.getContext("2d")!;

          ctx.clearRect(0, 0, width, height);

          ctx.beginPath();
          let start = true;
          for (let x = xBounds[0]; x < xBounds[1]; x += step) {
               let y: number;
               try {
                    y = evaluate(text, { x });
               } catch (err) {
                    console.log(err);
                    return;
               }

               const coords = [(x - xBounds[0]) / (xBounds[1] - xBounds[0]) * width, height - (((y - yBounds[0]) / (yBounds[1] - yBounds[0]))) * height] as const;

               if (start) {
                    ctx.moveTo(...coords);
                    start = false;
               } else {
                    ctx.lineTo(...coords)
               }
          }

          ctx.stroke();
     }, [text, xBounds, yBounds, step]);

     return (
          <Stack spacing={2} sx={theme => ({ padding: theme.spacing(2), width: "100%" })}>
               <TextField style={{ display: "block" }} type="text" value={text} onChange={(e) => setText(e.target.value)} />
               <FormControlLabel
                    sx={{ minWidth: "400px" }}
                    label={`Scale: ${step}`}
                    control={
                         <Slider
                              valueLabelDisplay="auto"
                              min={0.001}
                              max={10}
                              step={0.001}
                              value={step}
                              onChange={(_, value) => setStep(value as number)}
                         />
                    }
               />
               <Stack direction="row" spacing={2}>
                    <TextField label="X min" type="number" value={xBounds[0]} onChange={(e) => setXBounds([parseFloat(e.target.value), xBounds[1]])} />
                    <TextField label="X max" type="number" value={xBounds[1]} onChange={(e) => setXBounds([xBounds[0], parseFloat(e.target.value)])} />
               </Stack>
               <Stack direction="row" spacing={2}>
                    <TextField label="Y min" type="number" value={yBounds[0]} onChange={(e) => setYBounds([parseFloat(e.target.value), yBounds[1]])} />
                    <TextField label="Y max" type="number" value={yBounds[1]} onChange={(e) => setYBounds([yBounds[0], parseFloat(e.target.value)])} />
               </Stack>
               <Box>
                    <canvas id="canvas" width={width} height={height} ref={canvasRef} style={{ border: "black 1px solid" }}></canvas>
               </Box>
          </Stack>
     );
}

export default App;
