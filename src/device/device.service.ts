import { Injectable } from '@nestjs/common';
import { ProjectorMaker } from './dto/device.dto';
import { SerialPort } from 'serialport';

@Injectable()
export class DeviceService {
  private port: SerialPort;

  connect() {
    try {
      this.port = new SerialPort({
        path: 'COM1',
        baudRate: 9600,
        parity: 'none',
        stopBits: 1,
        dataBits: 8,
      });

      this.port.on('open', () => {
        console.log(`Connected to Serial`);
      });

      this.port.on('data', (data: Buffer) => {
        console.log(`Received data: ${data.toString()}`);
      });

      this.port.on('error', (err: any) => {
        console.error('Error:', err.message);
        return false;
      });
    } catch (error) {
      console.error('Error connecting to serial port:', error.message);
      return false;
    }
  }

  disconnect(): void {
    if (this.port && this.port.isOpen) {
      this.port.close((err: any) => {
        if (err) {
          console.error('Error closing serial port:', err.message);
        } else {
          console.log('Serial port closed.');
        }
      });
    }
  }

  setControl(projector, onoff) {
    //1. serial port init
    if (this.port == null) {
      this.connect();
      console.log('this.port.isOpen = ', this.port.isOpen);
    }

    // if (!this.port.isOpen)
    //   return {
    //     statusCode: 400,
    //     message: 'No such file or directory, cannot open COM1',
    //   };

    //2. get control value
    const control_value = this.getControlValue(projector, onoff);

    //control
    return this.control(control_value);
  }

  getControlValue(projector, onoff) {
    if (onoff == true) {
      switch (projector) {
        case ProjectorMaker.Epson:
          return 'PWR ON';
        case ProjectorMaker.LG:
          return 'ka 01 01 0x0D';
        case ProjectorMaker.Panasonic:
          return '\x02ADZZ;PON\x03';
      }
    } else if (onoff == false) {
      switch (projector) {
        case ProjectorMaker.Epson:
          return 'PWR OFF';
        case ProjectorMaker.LG:
          return 'ka 01 00 0x0D';
        case ProjectorMaker.Panasonic:
          return '\x02ADZZ;POF\x03';
      }
    } else {
      switch (projector) {
        case ProjectorMaker.Epson:
          return 'PWR?';
        case ProjectorMaker.LG:
          return 'ka 01 FF 0x0D';
        case ProjectorMaker.Panasonic:
          return '\x02ADZZ;QPW\x03';
      }
    }
  }

  control(data: string): boolean {
    const message = this.makeMessage(data);

    return this.send(message);
  }

  makeMessage(data: string): string {
    const end = '\r';
    const message = `${data}${end}`;
    return `${message}`;
  }

  send(message: string): boolean {
    return this.port.write(message);
  }
}
